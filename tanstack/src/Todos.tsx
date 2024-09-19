import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const getTodos = async () => {
  const result = await fetch('https://dummyjson.com/todos');
  
  return result
}

export default function Todos() {
  /**
   * 1. staleTime이 Infinity로 설정이 되면 데이터가 무한정 fresh 상태(동일한 쿼리 키에 대한 요청x)로 설정이 된다.
   * 2. 하지만 쿼리 인스턴스가 언마운트되고 inactive 상태로 변경된 후 gcTime이 지나 데이터가 메모리에서 제거된다면 staleTime이 Infinity여도 캐싱된 데이터를 불러올 수 없기 때문에 요청이 발생한다.
   * 3. 따라서 적어도 gcTime이 staleTime보다 길어야만 fresh 상태(staleTime이 지나지 않은 경우)인 경우 올바르게 캐싱된 데이터를 가져온다.
   * 
   * 정리
   * - gcTime은 적어도 staleTime보다 커야 한다.
   * - gcTime이 지나지 않았더라도 staleTime이 지나면 재요청이 발생한다.
   * - staleTime보다 gcTime이 크다면 캐싱된 데이터를 불러와야하지만 재요청이 이루어지고
   * - gcTime이 staleTime보다 크다면 불필요하게 캐싱이 되어 있는 상황이 발생할 수 있으니
   * - staleTime과 gcTime은 동일하게 가져가는게 가장 적절하지 않나 생각
   * - 이렇게 하려면 기본적으로는 gcTime, staleTime을 0으로 설정하고 개별적인 query마다 설정하는게 좋을듯? 
   */
  const {} = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
    gcTime: 12000, 
    staleTime: 1000
  }) 
  return <div>
    <Link to="/todo">Move</Link>  
  </div>
}