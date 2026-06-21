import * as React from 'react';

import { cn } from '@/lib/shadcn/utils';

function H1({ className, ...props }: React.ComponentProps<'h1'>) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance',
        className,
      )}
      {...props}
    />
  );
}

function H2({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      className={cn('scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0', className)}
      {...props}
    />
  );
}

function H3({ className, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)} {...props} />
  );
}

function H4({ className, ...props }: React.ComponentProps<'h4'>) {
  return (
    <h4 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)} {...props} />
  );
}

function P({ className, ...props }: React.ComponentProps<'p'>) {
  return <p className={cn('leading-7', className)} {...props} />;
}

function Blockquote({ className, ...props }: React.ComponentProps<'blockquote'>) {
  return <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)} {...props} />;
}

function List({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)} {...props} />;
}

function InlineCode({ className, ...props }: React.ComponentProps<'code'>) {
  return (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className,
      )}
      {...props}
    />
  );
}

function Lead({ className, ...props }: React.ComponentProps<'p'>) {
  return <p className={cn('text-xl text-muted-foreground', className)} {...props} />;
}

function Large({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('text-lg font-semibold', className)} {...props} />;
}

function Small({ className, ...props }: React.ComponentProps<'small'>) {
  return <small className={cn('text-sm leading-none font-medium', className)} {...props} />;
}

function Muted({ className, ...props }: React.ComponentProps<'p'>) {
  return <p className={cn('text-sm text-muted-foreground', className)} {...props} />;
}

function Table({
  className,
  wrapperClassName,
  ...props
}: React.ComponentProps<'table'> & {
  wrapperClassName?: string;
}) {
  return (
    <div className={cn('my-6 w-full overflow-y-auto', wrapperClassName)}>
      <table className={cn('w-full', className)} {...props} />
    </div>
  );
}

function Thead({ className, ...props }: React.ComponentProps<'thead'>) {
  return <thead className={className} {...props} />;
}

function Tbody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return <tbody className={className} {...props} />;
}

function Tr({ className, ...props }: React.ComponentProps<'tr'>) {
  return <tr className={cn('m-0 border-t p-0 even:bg-muted', className)} {...props} />;
}

function Th({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      className={cn(
        'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  );
}

function Td({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      className={cn(
        'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  );
}

export {
  H1,
  H2,
  H3,
  H4,
  P,
  Blockquote,
  List,
  InlineCode,
  Lead,
  Large,
  Small,
  Muted,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
};
