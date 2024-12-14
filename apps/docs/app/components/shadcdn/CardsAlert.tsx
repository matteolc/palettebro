import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "~/components/ui/alert"

export function CardsAlert() {
  return (
    <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-4">
    <Alert style={{ backgroundColor: "oklch(var(--info-500))", color: "oklch(var(--on-info-container))", borderColor: "oklch(var(--info-600))" }}>
      <AlertCircle className="h-4 w-4" style={{ color: "oklch(var(--on-info-container))" }}/>
      <AlertTitle>Info</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>      
    <Alert style={{ backgroundColor: "oklch(var(--success-500))", color: "oklch(var(--on-success-container))", borderColor: "oklch(var(--success-600))" }}>
      <AlertCircle className="h-4 w-4" style={{ color: "oklch(var(--on-success-container))" }}/>
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>        
    <Alert style={{ backgroundColor: "oklch(var(--warning-500))", color: "oklch(var(--on-warning-container))", borderColor: "oklch(var(--warning-600))" }}>
      <AlertCircle className="h-4 w-4" style={{ color: "oklch(var(--on-warning-container))" }}/>
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>                  
    <Alert variant="destructive" style={{ backgroundColor: "oklch(var(--error-500))", color: "oklch(var(--on-error-container))", borderColor: "oklch(var(--error-600))" }}>
      <AlertCircle className="h-4 w-4" style={{ color: "oklch(var(--on-error-container))" }}/>
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
    </div>
  )
}
