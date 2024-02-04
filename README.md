# 前端client


## 开发环境设置

本项目使用 Docker 容器化环境来确保一致的开发体验。请遵循以下步骤来设置和运行开发环境。

### 先决条件

- 安装 [Docker](https://www.docker.com/get-started)
- 安装 [Node.js](https://nodejs.org/) (如果需要在本地运行或测试)

### 安装和启动

1. **克隆仓库**

   ```bash
   git checkout feature/client
   git clone <https://github.com/lisiCAO/Rental-Management-Web.git>
   ```

2. **构建 Docker 镜像**

   ```bash
   docker-compose build
   ```

   这一步将会根据 `Dockerfile` 和 `docker-compose.yml` 文件构建 Docker 镜像。

3. **启动 Docker 容器**

   ```bash
   docker-compose up
   ```

   这将启动所有必要的服务。你的应用现在应该在 [http://localhost:3000](http://localhost:3000) 上运行。

### 文件夹挂载说明

以下文件夹被挂载到 Docker 容器中，意味着你可以在本地编辑这些文件夹中的文件，更改将实时反映在容器中：

- `src/` - 包含 React 应用的源代码。
- `public/` - 包含公共静态文件。

### 注意事项

- 如果需要对 Dockerfile 或 docker-compose.yml 进行重大更改，请联系[LISI CAO]。
- 对于添加新的依赖或需要更新 node_modules 的情况，请运行 `docker-compose build` 重新构建镜像。
