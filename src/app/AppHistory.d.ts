import { RouteComponentProps, Switch } from "react-router";
import { FunctionComponent, ReactElement } from "react";

export interface AppHistoryProps extends RouteComponentProps {
  children: ReactElement | ReactElement[];
}

export type AppHistoryFC = FunctionComponent<AppHistoryProps>;
