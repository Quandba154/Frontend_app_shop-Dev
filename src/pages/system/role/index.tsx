//** Import React and Next.js */
import { NextPage } from 'next'
import RoleListPage from 'src/views/pages/system/role/RoleList'

// ** views


type TProps = {}

const Index: NextPage<TProps> = () => {
    return (
        <>
            <RoleListPage></RoleListPage>
        </>
    )
}

export default Index


// MyProfile.getLayout = (page: React.ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>

