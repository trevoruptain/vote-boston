export function Footer() {
  return (
    <footer className="border-grid border-t w-full">
      <div className="py-4 flex justify-center w-full">
        <div className="text-balance text-center text-sm leading-loose text-muted-foreground w-full">
          Built by{" "}
          <a
            href="https://x.com/trevoruptain"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Trevor Uptain
          </a>
          . The source code is available on{" "}
          <a
            href="https://github.com/trevoruptain/vote-boston"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </div>
      </div>
    </footer>
  );
}
