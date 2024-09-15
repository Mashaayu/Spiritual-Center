import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AdminModule } from './app/Modules/admin/admin.module';

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));

  // platformBrowserDynamic().bootstrapModule(AdminModule, {
  //   ngZoneEventCoalescing: true
  // })
  //   .catch(err => console.error(err));
  