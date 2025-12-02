import { Header } from "@/components/header";
import { BlurFade } from "@/components/ui/blur-fade";
import TableCard from "@/components/dictionary/TableCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function DictionaryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const tables = [
    { name: "tblClientes", description: "Tabela de cadastro de clientes", fields: 24, type: "Master" },
    { name: "tblPedidos", description: "Registro de pedidos de venda", fields: 18, type: "Transacional" },
    { name: "tblProdutos", description: "Catálogo de produtos", fields: 32, type: "Master" },
    { name: "tblEstoque", description: "Controle de estoque", fields: 12, type: "Operacional" },
    { name: "tblFornecedores", description: "Cadastro de fornecedores", fields: 16, type: "Master" },
    { name: "tblPagamentos", description: "Registro de pagamentos", fields: 10, type: "Financeiro" },
  ];

  const filtered = tables.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            {filtered.map((table, i) => (
              <TableCard key={table.name} table={table} i={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 dark:text-slate-400">Nenhuma tabela encontrada para "{searchQuery}"</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
