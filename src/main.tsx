import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import { NextUIProvider } from "@nextui-org/react"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import ThemeProvider from "./components/theme-provider"
import "./index.css"
import AuthGuard from "./features/user/authGuard"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <Provider store={ store }>
      <NextUIProvider>
        <ThemeProvider>
          <AuthGuard>
            <RouterProvider router={ router } />
          </AuthGuard>
        </ThemeProvider>
      </NextUIProvider>
    </Provider>
  )
}
