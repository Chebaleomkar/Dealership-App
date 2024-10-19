import { Heading } from '@/components/Heading'
import DashboardContent from '@/components/layout/Dashboard-content'
import PurchaseHistory from '@/components/PurchaseHistory'

const PurchaseHistoryPage = () => {
    return (
        <DashboardContent>
            <Heading title='Purchase History' description='watch history here' />
            <PurchaseHistory />
        </DashboardContent>
    )
}

export default PurchaseHistoryPage
