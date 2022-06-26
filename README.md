# three-webpack-boiler

Simple boiler to get started on quick projects with threejs.  
Make prototypes, try things out, run some tests.  
I do not recommend using it for large and complex architectures.

First install dependencies:

```sh
npm install
```

## Running

To run develop mode

```sh
npm run dev
```

## Build

To build this project run

```sh
npm run build
```

## AssetsManager

```sh
src/assets/models
src/assets/textures
src/assets/sounds
```

Assets located in these folders are automatically imported in **AssetsManager.js**.  
Textures are converted to THREE.Texture instances.  
Sounds are converted to THREE.Audio instances.

You can access them like that:

```
AssetsManager.[folderName].[assetName]
```

Example: I need to get a texture which is named "bake.jpg"

```js
const bakeTexture = AssetsManager.textures.bake
console.log(bakeTexture)
```

Of course, you can customize it the way you like it.  
 For instance, You could create **Howler** instances instead of **THREE.Audio** instances when it comes to loading sounds
