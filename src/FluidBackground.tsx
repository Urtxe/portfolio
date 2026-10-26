import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";

const vertexSource = `
precision mediump float;
attribute vec2 a_uv;
uniform float u_time;
uniform float u_aspect;
varying vec3 v_normal;
varying vec3 v_position;

vec3 surface(float u, float theta) {
  float radius = 1.22;
  float tube = 0.7 + 0.11 * sin(2.0 * u + u_time * 0.15);
  float twist = 0.22 * sin(2.0 * u + u_time * 0.15);
  float radial = radius + tube * cos(theta + twist);
  float x = radial * cos(u);
  float y = radial * sin(u) * 0.86;
  float z = tube * 0.62 * sin(theta + twist) + 0.12 * sin(2.0 * u + u_time * 0.15) * cos(theta);
  return vec3(x, y, z);
}

vec3 rotatePoint(vec3 p, float rx, float ry, float rz) {
  float cz = cos(rz), sz = sin(rz);
  p.xy = mat2(cz, -sz, sz, cz) * p.xy;
  float cy = cos(ry), sy = sin(ry);
  p.xz = mat2(cy, -sy, sy, cy) * p.xz;
  float cx = cos(rx), sx = sin(rx);
  p.yz = mat2(cx, -sx, sx, cx) * p.yz;
  return p;
}

void main() {
  float u = a_uv.x * 6.2831853;
  float theta = a_uv.y * 6.2831853;
  vec3 p = surface(u, theta);
  vec3 tangentU = surface(u + 0.003, theta) - surface(u - 0.003, theta);
  vec3 tangentV = surface(u, theta + 0.003) - surface(u, theta - 0.003);
  vec3 normal = normalize(cross(tangentU, tangentV));

  float rx = 0.78 + 0.14 * sin(u_time * 0.09);
  float ry = 0.12 + 0.2 * cos(u_time * 0.11);
  float rz = u_time * 0.014;
  p = rotatePoint(p, rx, ry, rz);
  normal = normalize(rotatePoint(normal, rx, ry, rz));

  float cameraZ = 4.8 + p.z;
  float wide = max(u_aspect, 0.1);
  gl_Position = vec4(p.x * 5.0 / wide, p.y * 5.0,
    (1.01 * cameraZ - 0.201), cameraZ);
  v_normal = normal;
  v_position = p;
}
`;

const fragmentSource = `
precision mediump float;
uniform float u_time;
varying vec3 v_normal;
varying vec3 v_position;

void main() {
  vec3 n = normalize(v_normal);
  vec3 viewDirection = normalize(vec3(0.0, 0.0, -4.8) - v_position);
  if (dot(n, viewDirection) < 0.0) n = -n;

  vec3 keyLight = normalize(vec3(-0.45 + 0.2 * sin(u_time * 0.12), 0.75, -0.85));
  vec3 fillLight = normalize(vec3(0.78, -0.28 + 0.15 * cos(u_time * 0.1), -0.72));
  vec3 warmLight = normalize(vec3(-0.15, -0.7, -0.85));
  float diffuse = max(dot(n, keyLight), 0.0);
  float fill = max(dot(n, fillLight), 0.0);
  float warm = max(dot(n, warmLight), 0.0);
  float specular = pow(max(dot(reflect(-keyLight, n), viewDirection), 0.0), 16.0);
  float fineSpecular = pow(max(dot(reflect(-keyLight, n), viewDirection), 0.0), 64.0);
  float softboxMint = pow(max(dot(n, normalize(vec3(-0.35, 0.85, -0.35))), 0.0), 6.0);
  float softboxGreen = pow(max(dot(n, normalize(vec3(0.8, 0.25, -0.5))), 0.0), 9.0);
  float champagneSpecular = pow(max(dot(n, normalize(vec3(-0.65, -0.5, -0.55))), 0.0), 11.0);
  float chromeEdge = pow(max(dot(reflect(-warmLight, n), viewDirection), 0.0), 58.0);
  float rim = pow(1.0 - max(dot(n, viewDirection), 0.0), 3.5);
  float grain = 0.5 + 0.5 * sin(v_position.x * 2.8 + v_position.y * 3.7 + u_time * 0.12);

  vec3 deep = vec3(0.006, 0.035, 0.029);
  vec3 green = vec3(0.075, 0.3, 0.2);
  vec3 mint = vec3(0.55, 0.95, 0.74);
  vec3 champagne = vec3(0.94, 0.79, 0.58);
  vec3 color = deep + green * (0.58 + 0.6 * diffuse + 0.42 * fill);
  color += mint * (0.68 * softboxMint + 0.5 * softboxGreen + 0.7 * specular + 0.45 * fineSpecular);
  color += champagne * (0.62 * champagneSpecular + 0.15 * warm * rim + 1.15 * chromeEdge);
  color += green * rim * (0.32 + grain * 0.12);
  color = color / (1.0 + color * 0.24);
  color = pow(color, vec3(1.0 / 2.2));
  gl_FragColor = vec4(color, 1.0);
}
`;

function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getMotionPreference() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(
      "Fluid background shader error:",
      gl.getShaderInfoLog(shader),
    );
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vertex = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertex || !fragment) {
    if (vertex) gl.deleteShader(vertex);
    if (fragment) gl.deleteShader(fragment);
    return null;
  }
  const program = gl.createProgram();
  if (!program) {
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    return null;
  }
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(
      "Fluid background program error:",
      gl.getProgramInfoLog(program),
    );
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionPreference,
    () => false,
  );
  const [manualPaused, setManualPaused] = useState<boolean | null>(null);
  const paused = manualPaused ?? prefersReducedMotion;
  const controlRef = useRef<(next: boolean) => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = sceneRef.current;
    if (!canvas || !scene) return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = canvas.getContext("webgl", {
        alpha: false,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      canvas.classList.add("is-fallback");
    }
    if (!gl) {
      canvas.classList.add("is-fallback");
      return;
    }

    const program = createProgram(gl);
    if (!program) {
      canvas.classList.add("is-fallback");
      return;
    }
    canvas.classList.remove("is-fallback");
    const segments = 144;
    const across = 36;
    const coordinates: number[] = [];
    const indices: number[] = [];
    for (let row = 0; row <= across; row += 1) {
      for (let column = 0; column <= segments; column += 1) {
        coordinates.push(column / segments, row / across);
        if (row < across && column < segments) {
          const current = row * (segments + 1) + column;
          indices.push(
            current,
            current + segments + 1,
            current + 1,
            current + 1,
            current + segments + 1,
            current + segments + 2,
          );
        }
      }
    }

    const vertexBuffer = gl.createBuffer();
    const indexBuffer = gl.createBuffer();
    if (!vertexBuffer || !indexBuffer) {
      if (vertexBuffer) gl.deleteBuffer(vertexBuffer);
      if (indexBuffer) gl.deleteBuffer(indexBuffer);
      gl.deleteProgram(program);
      canvas.classList.add("is-fallback");
      return;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(coordinates),
      gl.STATIC_DRAW,
    );
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices),
      gl.STATIC_DRAW,
    );

    const position = gl.getAttribLocation(program, "a_uv");
    const timeUniform = gl.getUniformLocation(program, "u_time");
    const aspectUniform = gl.getUniformLocation(program, "u_aspect");
    gl.useProgram(program);
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clearColor(0.008, 0.026, 0.024, 1);

    let animationFrame = 0;
    let visible = false;
    let elapsed = 0;
    let origin = performance.now();
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const resize = () => {
      const rect = scene.getBoundingClientRect();
      const scale = Math.min(
        window.devicePixelRatio || 1,
        1.35,
        Math.sqrt(1_800_000 / (rect.width * rect.height)),
      );
      const width = Math.max(1, Math.round(rect.width * scale));
      const height = Math.max(1, Math.round(rect.height * scale));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl?.viewport(0, 0, width, height);
      gl?.useProgram(program);
      if (aspectUniform)
        gl?.uniform1f(aspectUniform, rect.width / Math.max(1, rect.height));
      draw(elapsed);
    };

    const draw = (time: number) => {
      if (!gl) return;
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      if (timeUniform) gl.uniform1f(timeUniform, time);
      if (aspectUniform)
        gl.uniform1f(aspectUniform, canvas.width / Math.max(1, canvas.height));
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    };

    const tick = (now: number) => {
      animationFrame = 0;
      if (pausedRef.current || !visible || document.hidden) return;
      elapsed = (now - origin) / 1000;
      draw(elapsed);
      animationFrame = window.requestAnimationFrame(tick);
    };
    const start = () => {
      if (
        !pausedRef.current &&
        visible &&
        !document.hidden &&
        !animationFrame
      ) {
        origin = performance.now() - elapsed * 1000;
        animationFrame = window.requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };
    const onMotionPause = () => {
      pausedRef.current = true;
      stop();
      draw(elapsed);
    };
    const onMotionPlay = () => {
      pausedRef.current = false;
      start();
    };
    controlRef.current = (next) => {
      if (next) onMotionPause();
      else onMotionPlay();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    observer.observe(scene);
    const onVisibilityChange = () => (document.hidden ? stop() : start());
    const onContextLost = (event: Event) => {
      event.preventDefault();
      stop();
      canvas.classList.add("is-fallback");
    };
    const onResize = () => resize();
    document.addEventListener("visibilitychange", onVisibilityChange);
    canvas.addEventListener("webglcontextlost", onContextLost);
    window.addEventListener("resize", onResize);
    pausedRef.current = motionPreference.matches;
    resize();
    if (pausedRef.current) draw(0);
    else start();

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      window.removeEventListener("resize", onResize);
      controlRef.current = () => {};
      gl?.deleteBuffer(vertexBuffer);
      gl?.deleteBuffer(indexBuffer);
      gl?.deleteProgram(program);
    };
  }, []);

  useEffect(() => {
    pausedRef.current = paused;
    controlRef.current(paused);
  }, [paused]);

  function toggleMotion() {
    const next = !pausedRef.current;
    pausedRef.current = next;
    setManualPaused(next);
    controlRef.current(next);
  }

  return (
    <>
      <div ref={sceneRef} className="fluid-scene" aria-hidden="true">
        <svg
          className="fluid-fallback"
          viewBox="0 0 1440 800"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="fluid-fallback-mint"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop stopColor="#09251c" />
              <stop offset=".32" stopColor="#83c7a5" />
              <stop offset=".48" stopColor="#f1e0bf" />
              <stop offset=".61" stopColor="#075640" />
              <stop offset=".8" stopColor="#b3e8ce" />
              <stop offset="1" stopColor="#102d24" />
            </linearGradient>
            <linearGradient
              id="fluid-fallback-edge"
              x1="0"
              y1="0"
              x2="1"
              y2=".2"
            >
              <stop stopColor="#061a16" />
              <stop offset=".48" stopColor="#d8d3bd" />
              <stop offset=".51" stopColor="#fff5da" />
              <stop offset=".56" stopColor="#4f9678" />
              <stop offset="1" stopColor="#071a15" />
            </linearGradient>
          </defs>
          <path
            d="M-180 670 C140 600 155 120 470 72 C770 25 805 655 1110 734 C1300 785 1510 642 1650 430"
            fill="none"
            stroke="url(#fluid-fallback-mint)"
            strokeWidth="190"
          />
          <path
            d="M-120 110 C200 340 350 685 676 641 C967 601 927 192 1197 139 C1387 102 1503 225 1600 365"
            fill="none"
            stroke="url(#fluid-fallback-mint)"
            strokeWidth="145"
          />
          <path
            d="M-100 550 C175 545 349 94 648 131 C927 166 975 557 1259 570 C1432 578 1544 444 1625 312"
            fill="none"
            stroke="url(#fluid-fallback-edge)"
            strokeWidth="5"
          />
        </svg>
        <canvas ref={canvasRef} className="fluid-canvas" aria-hidden="true" />
        <div className="fluid-shade" />
      </div>
      <button
        type="button"
        className="motion-toggle"
        onClick={toggleMotion}
        aria-pressed={paused}
        aria-label={paused ? "Reanudar movimiento" : "Pausar movimiento"}
      >
        {paused ? <Play size={13} /> : <Pause size={13} />}
        {paused ? "Reanudar" : "Pausar"}
      </button>
    </>
  );
}
