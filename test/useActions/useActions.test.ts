import { renderHook, act } from "@testing-library/react";
import useActions from "@useActions";

describe("test useActions", () => {
  it("test count", () => {
    const { result } = renderHook(() =>
      useActions(
        {
          add: (state, payload: number) => ({
            ...state,
            count: state.count + payload,
          }),
          increment: (state) => ({
            ...state,
            count: state.count + 1,
          }),
        },
        { count: 0 }
      )
    );

    expect(result.current[0].count).toBe(0);

    act(() => {
      result.current[1].add(10);
    });

    expect(result.current[0].count).toBe(10);

    act(() => {
      result.current[1].increment();
    });

    expect(result.current[0].count).toBe(11);
  });
  it("test wrong reducer", () => {
    const { result } = renderHook(() =>
      useActions(
        {
          // @ts-ignore
          add: undefined,
        },
        { count: 0 }
      )
    );

    expect(result.current[0].count).toBe(0);

    act(() => {
      result.current[1].add(undefined);
    });

    expect(result.current[0].count).toBe(0);
  });
});
