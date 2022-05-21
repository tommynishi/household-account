import { ReactNode } from "react"
import { Header } from "../organisms/Header"

export const HeaderLayout = (children: ReactNode) => {
  return (
    <>
      <Header />
        {children}
    </>
  )
}