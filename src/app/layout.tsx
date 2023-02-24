import '../styles/global.css'

import {
	AppHeader
} from '../components/AppHeader'

import { Roboto } from '@next/font/google'

const roboto = Roboto({
	subsets: ['latin'],
	weight: ["700", "400", "500"]
})

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	
	return (
		<html className={roboto.className} lang="pt-br">
			<head />
			<body>
				<AppHeader/>
				{children}
			</body>
		</html>
	)
}
