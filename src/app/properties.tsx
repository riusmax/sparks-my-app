import { propertyKeys } from "@/api/query-keys";
import { fetchProperties } from "@/api/rest";
import { useQuery } from "@tanstack/react-query";
import { Text, View } from "react-native"

function PropertiesScreen (): React.ReactNode {

  const { data, isLoading, error } = useQuery({
    queryKey: propertyKeys.all, 
    queryFn: () => fetchProperties({ page: 1 }),
    retry: false, // Désactiver les tentatives de réessai automatiques
    placeholderData: (prev) => prev
  })

  return ( 
    <View>
      <Text>Properties</Text>
      <Text>{JSON.stringify(data, null, 2)}</Text>
    </View>
   );
}

export default PropertiesScreen ;