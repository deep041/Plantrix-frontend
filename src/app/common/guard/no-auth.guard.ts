import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const noAuthGuard: CanActivateFn = (route, state) => {

    const router = inject(Router);

    if (localStorage.getItem('token')) {
        router.navigate(['/']);
    }
    
    return true;
};
