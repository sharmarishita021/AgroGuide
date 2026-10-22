import React from 'react';
import FarmHealth from './FarmHealth';

/**
 * GoGreen is now merged into FarmHealth as requested.
 * Re-exporting FarmHealth ensures backward compatibility with /go-green routes.
 */
export default function GoGreen(props) {
  return <FarmHealth {...props} />;
}
