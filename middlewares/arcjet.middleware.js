import aj from '../config/arcjet.js';

// filepath: c:\subscriptionTraker\middlewares\arcjet.middleware.js
const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });
    console.log('Arcjet Decision:', decision);

    if (decision.isDenied()) {
      if (decision.reason.type === 'BOT' && decision.reason.denied.includes('POSTMAN')) {
        return next(); // Allow Postman requests
      }

      if (decision.reason.isRateLimit()) return res.status(429).json({ error: 'Rate limit exceeded' });
      if (decision.reason.isBot()) return res.status(403).json({ error: 'Bot detected' });

      return res.status(403).json({ error: 'Access denied' });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default arcjetMiddleware;

// import aj from '../config/arcjet.js';

// const arcjetMiddleware = async (req, res, next) => {
//   try {
//     const decision = await aj.protect(req, { requested: 1 });

//     if(decision.isDenied()) {
//       if(decision.reason.isRateLimit()) return res.status(429).json({ error: 'Rate limit exceeded' });
//       if(decision.reason.isBot()) return res.status(403).json({ error: 'Bot detected' });

//       return res.status(403).json({ error: 'Access denied' });
//     }

//     next();
//   } catch (error) {
//     console.log(`Arcjet Middleware Error: ${error}`);
//     next(error);
//   }
// }

// export default arcjetMiddleware;