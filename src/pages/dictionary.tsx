import TableCard from "@/components/dictionary/TableCard";
import { Header } from "@/components/header";
import LoadingContent from "@/components/loadingContent";
import { BlurFade } from "@/components/ui/blur-fade";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/ui/pagination";
import { useTables } from "@/hooks/useTables";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

export default function DictionaryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, isLoading, isError, isFetching } = useTables(
    page,
    limit,
    debouncedSearch || undefined
  );

  // const tables = [
  //   { name: "tblClientes", description: "Tabela de cadastro de clientes", fields: 24, type: "Master" },
  //   { name: "tblPedidos", description: "Registro de pedidos de venda", fields: 18, type: "Transacional" },
  //   { name: "tblProdutos", description: "Catálogo de produtos", fields: 32, type: "Master" },
  //   { name: "tblEstoque", description: "Controle de estoque", fields: 12, type: "Operacional" },
  //   { name: "tblFornecedores", description: "Cadastro de fornecedores", fields: 16, type: "Master" },
  //   { name: "tblPagamentos", description: "Registro de pagamentos", fields: 10, type: "Financeiro" },
  // ];

  const tables = data?.data?.data || [];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors">
      <Header />

      <main className="pt-32 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <BlurFade delay={0.1}>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Dicionário de Dados</h1>
              <p className="text-slate-600 dark:text-slate-400">
                Explore tabelas, campos e relacionamentos do sistema
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.2}>
            <div className="relative mb-8">
              <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Buscar tabelas, campos ou descrições..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-white/60 dark:bg-black/60 border-gray-200 dark:border-neutral-800"
              />
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading || isFetching ? (
              <LoadingContent />
            ) : isError ? (
              <p>Erro ao carregar tabelas</p>
            ) : (
              tables.map((table, i) => (
                <TableCard key={table.name} table={table} i={i} />
              ))
            )}
          </div>

          {!isLoading && !isFetching && tables && tables.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 dark:text-slate-400">
                {debouncedSearch
                  ? `Nenhuma tabela encontrada para "${debouncedSearch}"`
                  : "Nenhuma tabela encontrada"}
              </p>
            </div>
          )}

          {/* Pagination */}
          {data?.data?.pagination && (
            <div className="max-w-7xl mx-auto">
              <div className="mt-6">
                <Pagination
                  page={page}
                  totalPages={data.data.pagination.total_pages}
                  totalItems={data.data.pagination.total}
                  limit={limit}
                  onPageChange={(p) => setPage(p)}
                  onLimitChange={(l) => {
                    setLimit(l);
                    setPage(1);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
