import { useHistory } from 'react-router-dom';
import { History } from 'history';
import { useAuth } from '~/app/stores/auth/AuthContext';
import { AuthContextValue } from '~/app/stores/auth/AuthContext.d';
import { UseRedirectToAuthHookResult } from './AppRoutesHooks.d';
import { redirectToAuth } from '~/app/shared/utils/Auth';

function createRedirectToAuth(
  { location }: History,
  authRedirect: (options?: RedirectLoginOptions) => void
): () => void {
  return () => redirectToAuth(location, authRedirect);
}

function useRedirectToAuth(): UseRedirectToAuthHookResult {
  const { loginWithRedirect } = useAuth() as AuthContextValue;
  const history = useHistory();

  const redirectToAuth = createRedirectToAuth(history, loginWithRedirect);

  return { redirectToAuth };
}

export { useRedirectToAuth };
