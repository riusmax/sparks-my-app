import { PropertiesQueryParams } from "@/types/property"

const propertyKeys = {
  all: ['properties'] as const,
  list: (params: PropertiesQueryParams) => [...propertyKeys.all, 'list', params] as const,
  details: (id: string) => [...propertyKeys.all, 'details', id] as const,
  detail: (id: string) => [...propertyKeys.details(id), 'detail', id] as const,
}



export {
  propertyKeys
}



