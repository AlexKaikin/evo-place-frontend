import { Aside } from '@app/_elements'
import { AutorizedGuard } from '@hocs'
import { Sidebar } from './_elements'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AutorizedGuard>
      <Aside hideInMobile>
        <Sidebar />
      </Aside>
      {children}
    </AutorizedGuard>
  )
}
