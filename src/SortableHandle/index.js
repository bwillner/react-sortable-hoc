import * as React from 'react';
import invariant from 'invariant';

import {provideDisplayName} from '../utils';

export default function sortableHandle(WrappedComponent) {
  return class WithSortableHandle extends React.Component {
    static displayName = provideDisplayName('sortableHandle', WrappedComponent);

    componentDidMount() {
      if (this.wrappedInstance.current === null) {
        throw "sortableHandle needs to receive a WrappedComponent wrapped with 'React.forward' and proper ref setting";
      }
      this.wrappedInstance.current.sortableHandle = true;
    }

    getWrappedInstance() {
      return this.wrappedInstance.current;
    }

    wrappedInstance = React.createRef();

    render() {
      const ref = this.wrappedInstance;

      return <WrappedComponent ref={ref} {...this.props} />;
    }
  };
}

export function isSortableHandle(node) {
  return node.sortableHandle != null;
}
