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
   * - staleTime은 초기 마운트된 시점으로부터 흐른다.
   *   -> 예를 들어, staleTime이 5초, gcTime이 2초로 설정된 쿼리 인스턴스가 존재한다고 생각하고 초기 마운트 시점을 00:00이라고 가정한다.
   *   -> 00:01 : 쿼리 언마운트(inactive), 2초간 캐싱
   *   -> 00:03 : 쿼리 마운트(fresh), 요청 발생 x
   *   -> 00:04 : 쿼리 언마운트(inactive), 2초간 캐싱
   *   -> 00:05 : 쿼리 마운트(fresh), 요청 발생 x
   *   -> 00:06 : 쿼리 언마운트(inactive), 2초간 캐싱
   *   -> 00:07 : 쿼리 마운트(stale), 요청 발생
   *   -> 쿼리가 inactive되고 다시 gcTime이 흐르기 전에 다시 마운트가 되어 캐시된 데이터를 불러온다고 하더라도 staleTime은 초기 마운트 시점으로부터 계산되므로 캐싱된 데이터가 남아있다고 하더라고 stale 상태이기 때문에 재요청이 발생한다.
   * - gcTime은 적어도 staleTime보다 커야 한다.
   *   -> 약간 애매한 문장인거 같긴 함.
   * - gcTime이 지나지 않았더라도 staleTime이 지나면 재요청이 발생한다.
   * - staleTime보다 gcTime이 크다면 캐싱된 데이터를 불러와야하지만 재요청이 이루어지고
   * - gcTime이 staleTime보다 크다면 불필요하게 캐싱이 되어 있는 상황이 발생할 수 있으니
   * - staleTime과 gcTime은 동일하게 가져가는게 가장 적절하지 않나 생각
   * - 이렇게 하려면 기본적으로는 gcTime, staleTime을 0으로 설정하고 개별적인 query마다 설정하는게 좋을듯? 
   */
  const {} = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
    gcTime: 66000, 
    staleTime: 5000
  }) 
  return <div>
    <Link to="/todo">Move</Link>  
  </div>
}