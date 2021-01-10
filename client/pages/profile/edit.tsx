import { NextPage } from 'next';

import Layout from '../../components/Layout';
import EditPage from '../../components/UserPage/EditPage';
import { authInitialProps } from '../../lib/auth';
import { authType, iUser } from '../../@types';
import { getRequest } from '../../lib/fetch';

interface Props {
  user: authType;
  profile: iUser;
}

const Edit: NextPage<Props> = ({ user, profile }) => {
  return (
    <Layout title="Edit Profile">
      <EditPage profile={profile} user={user} />
    </Layout>
  );
};

Edit.getInitialProps = async (ctx) => {
  const { user } = await authInitialProps(true)(ctx);

  const profile = await getRequest(`/users/${user.user?._id}`).then((res) =>
    res.json(),
  );

  return { user, profile };
};

export default Edit;
