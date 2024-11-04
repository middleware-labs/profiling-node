# profiling-node
Official Middleware Profiling SDK for NodeJS

## Example

```javascript

const profiler = require('@middleware.io/profiling-node');
profiler.track({
    accessToken:"Your access token",
    serviceName:"Your service name",
})
```