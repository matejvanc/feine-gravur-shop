import Home from "../page";

type CatchAllProps = {
  params: Promise<{ path?: string[] }> | { path?: string[] };
};

export default async function CatchAllPage({ params }: CatchAllProps) {
  const resolvedParams = await params;
  const path = resolvedParams.path ?? [];

  return <Home initialPath={`/${path.join("/")}`} />;
}
