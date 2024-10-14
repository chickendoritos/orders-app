Note: My thoughts and questions are commented throughout the code, mostly in the OrdersService. Also, as I was going through this, my thoughts were getting a bit scrambled because I feel like there were many ways to do this and the requirements, understandably, seemed brief. I believe a conversation would be great to iron out any details.

## File structure

```
/src contains the orders api with controller
/libs contains any business logic for orders, inventory, and customers
```

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

App should be listening on http://localhost:3000

## General architecture

### Microservice communication

In the case for create order, when I wrote this code, I assumed the orders service would be responsible for validating inventory, authorizing payment, etc. But if we can assume the storefront has already validated the order, then the storefront can push the order to a queue(or topic if other services want to be notified as well) and the orders service consume the order. And then the orders service can use direct communication to fetch customer details and product details from CustomerService and InventoryService.

### Security

Depending on whats needed, we can generate api keys for the services and validate them in incoming requests. If the other microservices are inside the same VPC and outgoing requests are not needed then I wouldn't include internet connectivity. Could also include rate limiting for incoming requests(get orders), but not sure on those requirements.

### Scaling

We can utilize the auto scale policy inside the ECS service and set a max scale.

### Availability

Depending on budget and level of availability needed, we can spread the microservice across availability zones and regions. For ECS, we should use a desired count of more than 1 to be sure we are running in more than 1 zone.

## Infra Solutions

<p>I generally do not advise always running APIs to use lambda as you will end up paying idle costs and lambda CPU costs are generally higher. If the service does not need to be always running then Lambda can be considered.</p>

<p>Note: Both solutions would use Route53, Cloudfront, and RDS. DynamoDB can be considered sometimes for quick lookups, but I generally prefer SQL databases.</p>

<p>Another note: For both solutions, if subscribing to a topic or polling a queue, then we can include SQS/EventBridge</p>

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

### 3. Kubernetes?

k8s can handle most, if not all, of the above. But in my opinion, k8s adds more complexity. If you have a dedicated infra team, then k8s can be considered. Otherwise, I would persuade devs away from k8s.
