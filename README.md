Note: My thoughts and questions are commented throughout the code, mostly in the OrdersService.

### Requirements

```bash
Node >= 16
```

### Project setup

```bash
$ yarn install
```

### Run the project

```bash
$ yarn run start
```

## Infra Solutions

<p>I generally do not advise running APIs to use lambda as you will end up paying idle costs and lambda CPU costs are generally higher.</p>

<p>Note: Both solutions would use Route53, Cloudfront, and RDS.</p>

### 1. API Gateway & Lambda

<p>Pros:</p>

- Entirely Serverless. Utilizes "scale to zero" meaning no costs when not in use.
- Less dev time if want to use API Gateway features like authorization, api keys, rate limiting, swagger, etc.
- Scaling is not a problem as more lambdas will spawn whenever needed
- Zero infra to "manage". Much easier.
- ECS service can scale up tasks to handle more traffic if needed.
- No networking to manage

<p>Cons:</p>

- If there is steady traffic, then costs may end up being more.
- Lambda boot up time for first request
- Lambdas have a max run time. For example, if you have a job that may end up running longer than that, then the job needs its own solution.
- If caching or state is needed, then you have to use an external service like ElastiCache.

### 2. ALB & ECS Fargate

<p>Pros:</p>

- Dockerized. Local environment can be very close to a production environment
- Don't need to worry about patching and updating EC2s
- Load balancer is generally cheaper than API Gateway.
- Can use tasks to better handle long running jobs
- Can use internal cache
- Run ECS tasks on multiple availability zones

<p>Cons:</p>

- Need to update any image related software periodically
- Costs even when not using it, minimum one minute charge.
- Setting up ECS is more complicated than lambdas
- More infra to manage
- Pay for idle
- Have to manage storefront API key access
- Setup proper networking with public(load balancer) and private(fargate) subnets
