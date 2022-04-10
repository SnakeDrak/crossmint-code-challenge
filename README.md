# CrossMint Megaverse Creator Challenge

Welcome to the best megaverse creator.

The final solution implemented was created using a clean architecture, SOLID principles, and some design patterns. The idea is the code would be reusable in the future for any other type of communication or use.

It is a challenge but over-engineering could be dangerous in real projects. The red line between reusable and overengineering could be diffuse in many cases. For that reason, I am a lover of XP methodology. In my opinion, refactoring the code is better over a large development process trying to make the best reusable code in the world.

On a normal day, it would be using some awesome frameworks like NestJS or Next.js. However, because the final challenge is to evaluate my coding skills, I tried to use the minimal external libraries possible.

Install the dependencies, build the code and enjoy creating megaverses!

- [CrossMint Megaverse Creator Challenge](#crossmint-megaverse-creator-challenge)
  - [Requirements](#requirements)
  - [Preparing](#preparing)
  - [How to use](#how-to-use)
    - [Node way](#node-way)
      - [Installation](#installation)
      - [Building](#building)
      - [Run](#run)
    - [Docker way](#docker-way)


## Requirements

* Node v12.20+ or Docker

## Preparing

By default the configuration is loaded via the environment. Plese, copy `sample.env` to `.env` file and configure it as you desire.

## How to use

### Node way

#### Installation

Just run:

```bash
$ npm i
```

#### Building

Just run:

```bash
$ npm run build
```

#### Run

With the current CLI Controller you can execute the use case that you want separated by comma:

```bash
$ npm run start -- -u SyncMapUseCase
```
```bash
$ npm run start -- -u SyncMapUseCase,AnotherFutureUseCase
```

### Docker way

You have to have permissions to run dockers with your user. Just run:

```bash
$ ./bin/run.sh -u SyncMapUseCase