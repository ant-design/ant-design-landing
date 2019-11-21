import AV from 'leancloud-storage';

export const appId = 'ogaJShC9qJERt8LqGO80z2pO-gzGzoHsz';
export const appKey = '8e5H5xBF86hI9vItQI1pt4kP';

AV.init({
  appId,
  appKey,
  // serverURLs: 'https://avoscloud.com',
  serverURLs: 'https://ogajshc9.lc-cn-n1-shared.com',
});

export default AV;
