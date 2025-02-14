import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes';

export default [
  layout('./routes/app/layout.tsx', [
    index('./routes/app/home.tsx'),
    route('docs', './routes/app/docs.tsx'),
    route('palette', './routes/app/palette.tsx'),
    route('favourites', './routes/app/favourites.tsx'),
    ...prefix('blocks', [
      layout('./routes/app/blocks/layout.tsx', [
        index('./routes/app/blocks/index.tsx'),
        route(':section', './routes/app/blocks/$section.tsx'),
      ]),
    ]),
    ...prefix('examples', [
      layout('./routes/app/examples/layout.tsx', [
        index('./routes/app/examples/index.tsx'),
        route('authentication', './routes/app/examples/authentication.tsx'),
        route('dashboard', './routes/app/examples/dashboard.tsx'),
        route('mail', './routes/app/examples/mail.tsx'),
        route('music', './routes/app/examples/music.tsx'),
        route('playground', './routes/app/examples/playground.tsx'),
        route('tasks', './routes/app/examples/tasks.tsx'),
        ...prefix('forms', [
          layout('./routes/app/examples/forms/layout.tsx', [
            index('./routes/app/examples/forms/index.tsx'),
            route('account', './routes/app/examples/forms/account.tsx'),
            route('appearance', './routes/app/examples/forms/appearance.tsx'),
            route('display', './routes/app/examples/forms/display.tsx'),
            route(
              'notifications',
              './routes/app/examples/forms/notifications.tsx',
            ),
          ]),
        ]),
      ]),
    ]),
  ]),
  route('generate', './routes/generate.ts'),
  ...prefix('view', [
    layout('./routes/view/layout.tsx', [
      route(':name', './routes/view/$name.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
