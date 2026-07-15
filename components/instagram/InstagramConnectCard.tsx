type Props = {
  connected: boolean;
  onConnect: () => void;
};

export default function InstagramConnectCard({
  connected,
  onConnect,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="text-2xl font-bold text-white">
        Instagram Account
      </h2>

      <p className="mt-2 text-slate-400">
        Connect your Instagram Professional account.
      </p>

      <div className="mt-8">

        {connected ? (
          <div className="inline-flex rounded-full bg-green-900 px-4 py-2 text-green-400">
            Connected
          </div>
        ) : (
          <button
            onClick={onConnect}
            className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Connect Instagram
          </button>
        )}

      </div>

    </div>
  );
}