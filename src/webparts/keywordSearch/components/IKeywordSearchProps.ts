import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IKeywordSearchProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
}
