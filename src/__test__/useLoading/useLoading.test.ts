import { renderHook, act } from "@testing-library/react";
import useLoading, { loadingSelector } from "@useLoading";

describe("test useLoading", () => {
  it("test loading", () => {
    const { result } = renderHook(() => useLoading());

    expect(loadingSelector(result.current[0])).toBeFalsy();

    act(() => {
      result.current[1].loading();
    });

    expect(loadingSelector(result.current[0])).toBeTruthy();

    act(() => {
      result.current[1].loadingCompleted();
    });

    expect(loadingSelector(result.current[0])).toBeFalsy();
  });
});
