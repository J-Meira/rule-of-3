import { memo, useCallback } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { Alert, Snackbar } from '@mui/material';
import { Button } from '@j-meira/mui-theme';
import { MdClose as CloseIcon } from 'react-icons/md';

import { useAppSelector } from '../../redux';
import { getDictionary } from '../../utils';

const period = 60 * 60 * 1000;

const registerPeriodicSync = (
  swUrl: string,
  registration: ServiceWorkerRegistration,
) => {
  setInterval(async () => {
    if ('onLine' in navigator && !navigator.onLine) return;

    const resp = await fetch(swUrl, {
      cache: 'no-store',
      headers: {
        cache: 'no-store',
        'cache-control': 'no-cache',
      },
    });

    if (resp?.status === 200) await registration.update();
  }, period);
};

export const PWABadge = memo(() => {
  const language = useAppSelector((state) => state.system.language);

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, registration) {
      if (registration?.active?.state === 'activated') {
        registerPeriodicSync(swUrl, registration);
        return;
      }

      if (!registration?.installing) return;

      registration.installing.addEventListener('statechange', (e) => {
        const sw = e.target as ServiceWorker;
        if (sw.state === 'activated')
          registerPeriodicSync(swUrl, registration);
      });
    },
  });

  const handleClose = useCallback(() => {
    setOfflineReady(false);
    setNeedRefresh(false);
  }, [setOfflineReady, setNeedRefresh]);

  const handleUpdate = useCallback(() => {
    updateServiceWorker(true);
  }, [updateServiceWorker]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      className='pwa-badge'
      open={offlineReady || needRefresh}
    >
      <Alert
        severity='info'
        variant='filled'
        action={
          <>
            {needRefresh && (
              <Button
                color='inherit'
                onClick={handleUpdate}
                size='small'
                variant='outlined'
              >
                {getDictionary('update', language)}
              </Button>
            )}
            <Button
              color='inherit'
              model='icon'
              onClick={handleClose}
              size='small'
              title={getDictionary('close', language)}
            >
              <CloseIcon />
            </Button>
          </>
        }
      >
        {getDictionary(needRefresh ? 'version' : 'offlineReady', language)}
      </Alert>
    </Snackbar>
  );
});

PWABadge.displayName = 'PWABadge';
