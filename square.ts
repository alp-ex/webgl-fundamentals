const canvas: HTMLCanvasElement = document.getElementById(
  "webgl-canvas"
) as HTMLCanvasElement;

// This is the WebGL rendering context, this object provides the API to draw on the canvas
const gl: WebGLRenderingContext = canvas.getContext(
  "webgl"
) as WebGLRenderingContext;

if (!gl) {
  alert("Unable to initialize WebGL. Your browser may not support it.");
}

// The buffer object is used to store the vertices of the square and potentially other data
const vertexBuffer: WebGLBuffer | null = gl.createBuffer();
if (!vertexBuffer) {
  throw new Error("Failed to create vertex buffer");
}

// bind the buffer object to target
// ARRAY_BUFFER: buffer containing vertex attributes, such as vertex coordinates, texture coordinate data, or vertex color data
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

// Define vertices for the first square
const vertices1: number[] = [
  -0.75,
  0.5, // Top left
  -0.25,
  0.5, // Top right
  -0.75,
  -0.5, // Bottom left
  -0.25,
  -0.5, // Bottom right
];

// Define vertices for the second square
const vertices2: number[] = [
  0.25,
  0.5, // Top left
  0.75,
  0.5, // Top right
  0.25,
  -0.5, // Bottom left
  0.75,
  -0.5, // Bottom right
];

// Write data into the buffer object for the first square
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices1), gl.STATIC_DRAW);

// Initialize shaders for the first square
const vsSource: string = `
    attribute vec2 aVertexPosition;
    void main(void) {
      gl_Position = vec4(aVertexPosition, 0.0, 1.0);
    }
    `;
const fsSource: string = `
      void main(void) {
          gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);  // Blue color
      }
      `;

// Create and link shader program for the first square
const shaderProgram: WebGLProgram | null = gl.createProgram();
if (!shaderProgram) {
  throw new Error("Failed to create shader program");
}
// Compile and attach vertex shader
const vertexShader: WebGLShader | null = gl.createShader(gl.VERTEX_SHADER);
if (!vertexShader) {
  throw new Error("Failed to create vertex shader");
}
gl.shaderSource(vertexShader, vsSource);
gl.compileShader(vertexShader);
gl.attachShader(shaderProgram, vertexShader);

// Compile and attach fragment shader
const fragmentShader: WebGLShader | null = gl.createShader(gl.FRAGMENT_SHADER);
if (!fragmentShader) {
  throw new Error("Failed to create fragment shader");
}
gl.shaderSource(fragmentShader, fsSource);
gl.compileShader(fragmentShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

// Enable and configure attributes for the first square
const position1: number = gl.getAttribLocation(
  shaderProgram,
  "aVertexPosition"
);
gl.enableVertexAttribArray(position1);
gl.vertexAttribPointer(position1, 2, gl.FLOAT, false, 0, 0);

// Draw the first square
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

// Write data into the buffer object for the second square
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices2), gl.STATIC_DRAW);

// Initialize shaders for the second square
const vertexSource2: string = `
      attribute vec2 aVertexPosition;
      void main(void) {
          gl_Position = vec4(aVertexPosition, 0.0, 1.0);
      }
      `;
const fragmentSource2: string = `
      void main(void) {
          gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);  // Red color
      }
      `;

// Create and link shader program for the second square
const shaderProgram2: WebGLProgram | null = gl.createProgram();
if (!shaderProgram2) {
  throw new Error("Failed to create shader program");
}
// Compile and attach vertex shader for the second square
const vertexShader2: WebGLShader | null = gl.createShader(gl.VERTEX_SHADER);
if (!vertexShader2) {
  throw new Error("Failed to create vertex shader");
}
gl.shaderSource(vertexShader2, vertexSource2);
gl.compileShader(vertexShader2);
gl.attachShader(shaderProgram2, vertexShader2);

// Compile and attach fragment shader for the second square
const fragmentShader2: WebGLShader | null = gl.createShader(gl.FRAGMENT_SHADER);
if (!fragmentShader2) {
  throw new Error("Failed to create fragment shader");
}
gl.shaderSource(fragmentShader2, fragmentSource2);
gl.compileShader(fragmentShader2);
gl.attachShader(shaderProgram2, fragmentShader2);
gl.linkProgram(shaderProgram2);
gl.useProgram(shaderProgram2);

// Enable and configure attributes for the second square
const position2: number = gl.getAttribLocation(
  shaderProgram2,
  "aVertexPosition"
);
gl.enableVertexAttribArray(position2);
gl.vertexAttribPointer(position2, 2, gl.FLOAT, false, 0, 0);

// Draw the second square
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
