// eslint-disable-next-line node/no-extraneous-import
import { RouteComponentProps } from 'react-router';

interface AuthFCProps {
  userID?: string;
  tags?: string;
}

export type AuthFC = (props: RouteComponentProps<AuthFCProps>) => JSX.Element;
