//** Import React and Next.js */
import { NextPage } from 'next'
import { PERMISSIONS } from 'src/configs/permission'

// ** views


type TProps = {}

const Index: NextPage<TProps> = () => {
    return (
        <>
            <h1>DASHBOARD</h1>
        </>
    )
}

Index.permission = [PERMISSIONS.DASHBOARD]
export default Index



