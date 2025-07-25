import { createFormHook, createFormHookContexts } from '@tanstack/react-form'

import Label from '@/components/Label'
import Boton from '@/components/Boton'

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts()

export const { useAppForm } = createFormHook({
  fieldComponents: {
    Label,
  },
  formComponents: {
    Boton,
  },
  fieldContext,
  formContext,
})
