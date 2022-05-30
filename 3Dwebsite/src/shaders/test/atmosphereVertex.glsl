
varying vec3 vertexNormal;


void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0.9);
    vertexNormal = normalize(normalMatrix * normal);
}