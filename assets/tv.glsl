precision mediump float;

uniform vec2 resolution;
uniform float time;

varying vec2 fragCoord;


float Noise21 (vec2 p, float ta, float tb) {
    return fract(sin(p.x*ta+p.y*tb)*5678.);
}



void main()
{
    vec2 uv = fragCoord/resolution.xy;

    float t = time+123.; // tweak the start moment
    float ta = t*.654321;
    float tb = t*(ta*.123456);
    
    float c = Noise21(uv, ta, tb);
    vec3 col = vec3(c);

    gl_FragColor = vec4(col,1.);
}


