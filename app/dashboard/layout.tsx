import Sidebar from '@/components/Sidebar'
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ms computer Dashboard ',
    description: 'Advance dashboard for ms computer shope'
};

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex">
            <Sidebar />
            <main className="w-full flex-1 overflow-hidden">
                {children}
            </main>
        </div>
    );
}