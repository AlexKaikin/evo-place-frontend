import { SAIT_URL } from '@configs'

export const meta = {
  title: 'Shop | EVO PLACE',
  description: 'Products...',
  metadataBase: new URL(SAIT_URL),
  alternates: { canonical: '/shop' },
  openGraph: {
    title: 'Shop | EVO PLACE',
    description: 'Products...',
    url: SAIT_URL,
    siteName: 'EVO PLACE',
    type: 'website',
  },
}
