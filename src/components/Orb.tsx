import { useEffect, useRef } from "react";
import { Renderer, Camera, Transform, Program, Mesh, Sphere } from "ogl";

interface OrbProps {
  hue?: number;
  hoverIntensity?: number;
  rotateOnHover?: boolean;
  forceHoverState?: boolean; // Vamos usar isso para o modo "FALANDO"
}

export default function Orb({
  hue = 0,
  hoverIntensity = 0.5,
  rotateOnHover = true,
  forceHoverState = false,
}: OrbProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Ref para ler o estado de hover sem recriar o contexto WebGL
  const forceHoverRef = useRef(forceHoverState);
  forceHoverRef.current = forceHoverState;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const renderer = new Renderer({
      alpha: true,
      dpr: Math.min(window.devicePixelRatio, 2),
    });

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    // Canvas deve ser block para evitar whitespace inline e preencher o container
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    el.appendChild(canvas);

    const camera = new Camera(gl, { fov: 35 });
    camera.position.set(0, 1, 7);
    camera.lookAt([0, 0, 0]);

    const scene = new Transform();

    // ── SHADERS (A mágica visual) ──
    const vertex = /* glsl */ `
      precision highp float;
      attribute vec3 position;
      attribute vec3 normal;
      attribute vec2 uv;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      uniform float uTime;
      uniform float uHover;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPos;

      // Simplex Noise Function
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
      }

      void main() {
        vUv = uv;
        vNormal = normal;
        
        // Efeito de ruído baseado no hover/fala
        float noise = snoise(position * 2.0 + uTime * 0.5);
        
        // Quando uHover é alto (falando), o orbe distorce mais
        float distortion = noise * (uHover * 0.6); 
        vec3 newPos = position + normal * distortion;

        vPos = newPos;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
      }
    `;

    const fragment = /* glsl */ `
      precision highp float;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPos;
      uniform float uHue;
      uniform float uTime;
      uniform float uHover;

      void main() {
        // Cores baseadas no Hue
        vec3 color1 = vec3(0.5 + 0.5 * cos(uHue + uTime * 0.2 + vUv.x), 0.5, 0.9);
        vec3 color2 = vec3(0.1, 0.8, 0.9); // Cyan base

        // Mistura de cores baseada na normal para dar efeito 3D
        float mixVal = dot(vNormal, vec3(0.0, 1.0, 0.0)) * 0.5 + 0.5;
        vec3 finalColor = mix(color1, color2, mixVal);

        // Brilho extra quando fala (uHover)
        finalColor += vec3(0.2) * uHover;

        // Fresnel (borda brilhante)
        float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
        finalColor += vec3(0.1, 0.8, 1.0) * fresnel * 2.0;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const geometry = new Sphere(gl, {
      radius: 1.2,
      widthSegments: 64,
      heightSegments: 64,
    });
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uHover: { value: 0 },
        uHue: { value: hue },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    let animationId: number;
    let currentHover = 0;

    const update = (t: number) => {
      animationId = requestAnimationFrame(update);
      const time = t * 0.001;

      program.uniforms.uTime.value = time;

      // Lê do ref para não precisar recriar o efeito inteiro
      const targetHover = forceHoverRef.current ? 1.0 : 0.0;
      // Lerp (suavização)
      currentHover += (targetHover - currentHover) * 0.05;

      program.uniforms.uHover.value = currentHover * hoverIntensity;

      // Rotação suave
      if (rotateOnHover) {
        mesh.rotation.y += 0.002;
        mesh.rotation.z += 0.001;
      }

      renderer.render({ scene, camera });
    };

    animationId = requestAnimationFrame(update);

    const resize = () => {
      if (!el) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w === 0 || h === 0) return; // Evita canvas 0x0
      renderer.setSize(w, h);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };

    window.addEventListener("resize", resize);
    resize();

    // Retry resize caso o container esteja com 0 dimensões no mount
    const resizeTimer = setTimeout(resize, 100);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
      // Libera o contexto WebGL para não atingir o limite do browser
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      if (el && canvas.parentNode === el) {
        el.removeChild(canvas);
      }
    };
    // NÃO incluir forceHoverState — lemos via ref
  }, [hue, hoverIntensity, rotateOnHover]);

  return <div ref={containerRef} className="w-full h-full relative z-10" />;
}
