import dynamic from 'next/dynamic';

export default dynamic(() => import('@modules/board'), {
  ssr: false
  // loading: () => <Skeleton />
});
