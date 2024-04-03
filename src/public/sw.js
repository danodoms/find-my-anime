import { offlineFallback, warmStrategyCache } from "workbox-recipes";
import { BackgroundSyncPlugin } from "workbox-background-sync";
import {
  registerRoute,
  Route,
  setDefaultHandler,
  setCatchHandler,
  NavigationRoute,
} from "workbox-routing";
import {
  CacheFirst,
  StaleWhileRevalidate,
  NetworkOnly,
  NetworkFirst,
} from "workbox-strategies";
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";

// declare let self: ServiceWorkerGlobalScope;

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);
console.log("thisss is service workerrr");

// self.skipWaiting();

//cache images

const imageRoute = new Route(
  ({ request, sameOrigin }) => {
    return sameOrigin && request.destination === "image";
  },

  new CacheFirst({
    cacheName: "images",
  })
);

registerRoute(imageRoute);

//cache navigations
const navigationRoute = new NavigationRoute(
  new NetworkFirst({
    cacheName: "navigation",
    networkTimeoutSeconds: 3,
  })
);

registerRoute(navigationRoute);

//background sync

const bgSyncPlugin = new BackgroundSyncPlugin("backgroundSyncQueue", {
  maxRetentionTime: 24 * 60,
});

// setDefaultHandler(new NetworkOnly());

// offlineFallback();

// Fallback assets to cache
const FALLBACK_HTML_URL = "/src/public/offline.html";
// const FALLBACK_IMAGE_URL = '/images/image-not-found.jpg';
const FALLBACK_STRATEGY = new CacheFirst();

// Warm the runtime cache with a list of asset URLs
warmStrategyCache({
  urls: [FALLBACK_HTML_URL],
  strategy: FALLBACK_STRATEGY,
});

// Use a stale-while-revalidate strategy to handle requests by default.
setDefaultHandler(new StaleWhileRevalidate());

// This "catch" handler is triggered when any of the other routes fail to
// generate a response.
setCatchHandler(async ({ event, request }) => {
  // The warmStrategyCache recipe is used to add the fallback assets ahead of
  // time to the runtime cache, and are served in the event of an error below.
  // Use `event`, `request`, and `url` to figure out how to respond, or
  // use request.destination to match requests for specific resource types.
  switch (request.destination) {
    case "document":
      console.log(`Handling request for: ${request.destination}`);
      return FALLBACK_STRATEGY.handle({ event, request: FALLBACK_HTML_URL });

    default:
      // If we don't have a fallback, return an error response.
      return Response.error();
  }
});
