import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { App } from './app/App';
import { getApplicationRootNode } from '~/app/shared/utils/AppDOM';

const mountNode = getApplicationRootNode();
const root = createRoot(mountNode);

root.render(<App />);