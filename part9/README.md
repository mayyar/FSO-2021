# a. Background and introduction

### Main principle

TypeScript is a typed superset of JavaScript, and eventually it's compiled into plain JavaScript code. TypeScript being a superset of JavaScript means that it includes all the features of JavaScript and its own additional features as well. In other words, all existing JavaScript code is actually valid TypeScript.

![](https://fullstackopen.com/static/de4f555f9967b4c373f40c98d10aa69b/5a190/1.png)

The _language_ consists of syntax, keywords and type annotations. The syntax is similar to but not the same as JavaScript syntax.

The _compiler_ is responsible for type information erasure (i.e. removing the typing information) and the code transformations. (TypeScript isn't actually genuine statically-typed code.)

The _language service_ collects type information from the source code.

## TypeScript key language features

### Type annotations

```ts
const birthdayGreeter = (name: string, age: number): string => {
  return `Happy birthday ${name}, you are now ${age} years old!`
}

const birthdayHero = 'Jane User'
const age = 22

console.log(birthdayGreeter(birthdayHero, 22))
```

### Structural typing

### Type inference

```ts
const add = (a: number, b: number) => {
  /* The return value is used to determine
     the return type of the function */
  return a + b
}
```

We can see that a and b are numbers based on their types. Thus, we can infer the return value to be of type _number_.

### Type erasure

TypeScript removes all type system constructs during compilation.

Input:

```ts
let x: SomeType
```

Output:

```ts
let x
```

## Why should one use TypeScript?

First of all, TypeScript offers _type checking and static code analysis_.

The second advantage of TypeScript is that the type annotations in the code can function as a type of _code-level documentation_.

The third advantage of TypeScript is that IDEs can provide more _specific_ and _smarter intellisense_ when they know exactly what types of data you are processing.

## What does TypeScript not fix?

As mentioned above, TypeScript type annotations and type checking exist only at compile time and no longer at runtime. Even if the compiler does not throw any errors, runtime errors are still possible. These runtime errors are especially common when handling external input, such as data received from a network request.

### Incomplete, invalid or missing types in external libraries

### Sometimes, type inference needs assistance

### Mysterious type errors

# b. First steps with TypeScript

## Setting things up

an npm project is set by running the command _npm init_ in an empty directory. Then we can install the dependencies by running

```shell
npm install --save-dev ts-node typescript
```

and set up _scripts_ within the package.json:

```json
{
  // ..
  "scripts": {
    "ts-node": "ts-node"
  }
  // ..
}
```

So if you want to run file.ts with ts-node, the whole command is:

```shell
npm run ts-node -- file.ts
```

### A note about the coding style

Let us add the project a configuration file `tsconfig.json` with the following content:

```json
{
  "compilerOptions": {
    "noImplicitAny": false
  }
}
```

The _tsconfig.json_ file is used to define how the TypeScript compiler should interpret the code, how strictly the compiler should work, which files to watch or ignore, and [much much more](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

Let's start by creating a simple Multiplier. It looks exactly as it would in JavaScript.

```ts
const multiplicator = (a, b, printText) => {
  console.log(printText, a * b)
}

multiplicator(2, 4, 'Multiplied numbers 2 and 4, the result is:')
```

But what happens if we end up passing wrong types of arguments to the multiplicator function?

```ts
const multiplicator = (a, b, printText) => {
  console.log(printText, a * b)
}

multiplicator(
  'how about a string?',
  4,
  'Multiplied a string and 4, the result is:'
)
```

Now when we run the code, the output is: _Multiplied a string and 4, the result is: NaN._

This is where we see the first benefits of TypeScript.

```ts
const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText, a * b)
}

multiplicator(
  'how about a string?',
  4,
  'Multiplied a string and 4, the result is:'
)
```

![](https://fullstackopen.com/static/7a73285e6588983383eb619b671d99f5/5a190/2.png)

## Creating your first own types
