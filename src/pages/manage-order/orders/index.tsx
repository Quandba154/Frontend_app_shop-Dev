//** Import React and Next.js */
import { NextPage } from 'next'
import { PERMISSIONS } from 'src/configs/permission'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <>
      <h1>User</h1>
    </>
  )
}

Index.permission = [PERMISSIONS.MANAGE_ORDER.ORDER.VIEW]
export default Index


// Register.getLayout = (page: React.ReactNode) => <BlankLayout>{page}</BlankLayout>
// Register.guestGuard = true
