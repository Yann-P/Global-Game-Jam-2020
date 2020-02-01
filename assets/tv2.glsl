
precision mediump float;

uniform vec2 resolution;
uniform float time;
uniform sampler2D iChannel0;
varying vec2 fragCoord;

void main( )
{
    // get screen uvs
    vec2 uv = fragCoord.xy / resolution.xy;
    
    // center
    uv -= 0.5;
    vec2 uv2 = uv;
    
    // correct aspect ratio
    float ar = resolution.x / resolution.y;
    uv.x *= ar;
    
    // measure distance from center
    float dd = dot(uv, uv);
    float dd2 = dot(uv2, uv2);

    // warp
    uv = (uv * dd) * 0.4 + uv * 0.6;
    uv2 = (uv2 * dd2) * 0.4 + uv2 * 0.6;

    //compute vignette
    float vignette = (1.0 - abs(uv2.x)) * (1.0 - abs(uv2.y)) / (1.0 + dd2);
    vignette *= vignette * 2.0;
    vignette *= max(0.0, 1.0 - 2.75 * max(abs(uv2.x), abs(uv2.y)));
    vignette = pow(vignette, 0.25);

    // restore
    uv += 0.5;
    uv2 += 0.5;

    // sample texture
    vec4 color = texture2D(iChannel0, uv2);
    // debug checker with aspect ratio correction
    // float a = mod(uv.x * 20.0, 2.0);
    // float b = mod(uv.y * 20.0, 2.0);
    // float c = 0.3;
    // if(int(a) != int(b))
    //    c = 0.7;

    // apply vertical scanlines 
    float v = abs(sin(uv.x * 270.0 + time * 3.0));
    v += abs(sin(uv.x * 380.0 + time * 1.1));
    v *= abs(sin(uv.x * 300.0 + time * 1.8));
    v = mix(v, 0.5, 0.9) - 0.1;
    // overlay
    if(v > 0.5)
        color = 1.0 - (1.0 - 2.0 * (v - 0.5)) * (1.0 - color);
    else
        color = (2.0 * v) * color;

    // apply vignette
    color *= vignette;

    gl_FragColor = color;
}


